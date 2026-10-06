from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Event
from ..schemas import EventCreate, EventResponse


router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.post(
    "/",
    response_model=EventResponse,
    status_code=status.HTTP_201_CREATED
)
def create_event(
    event_data: EventCreate,
    db: Session = Depends(get_db)
):
    new_event = Event(
        title=event_data.title,
        description=event_data.description,
        category=event_data.category,
        location=event_data.location,
        event_date=event_data.event_date,
        ticket_price=event_data.ticket_price,
        banner_image=event_data.banner_image,
        total_tickets=event_data.total_tickets,
        available_tickets=event_data.total_tickets
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event


@router.get(
    "/",
    response_model=list[EventResponse]
)
def get_events(
    category: str | None = Query(
        default=None,
        description="Filter by category: Music, Tech, Sports, Business"
    ),
    search: str | None = Query(
        default=None,
        description="Search events by title"
    ),
    db: Session = Depends(get_db)
):
    query = db.query(Event)

    if category:
        query = query.filter(
            Event.category == category
        )

    if search:
        query = query.filter(
            Event.title.ilike(f"%{search}%")
        )

    return query.order_by(Event.event_date.asc()).all()


@router.get(
    "/{event_id}",
    response_model=EventResponse
)
def get_event(
    event_id: int,
    db: Session = Depends(get_db)
):
    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if event is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Event not found"
        )

    return event