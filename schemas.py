from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from .models import BookingStatus, EventCategory, NotificationType


# =========================
# User Schemas
# =========================

class UserRegister(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=50
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=100
    )


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: EmailStr
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# =========================
# Event Schemas
# =========================

class EventCreate(BaseModel):
    title: str = Field(
        ...,
        min_length=3,
        max_length=200
    )

    description: str = Field(
        ...,
        min_length=10
    )

    category: EventCategory

    location: str = Field(
        ...,
        min_length=2,
        max_length=255
    )

    event_date: datetime

    ticket_price: float = Field(
        ...,
        ge=0
    )

    banner_image: str | None = Field(
        default=None,
        max_length=500
    )

    total_tickets: int = Field(
        default=100,
        gt=0
    )


class EventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str
    category: EventCategory
    location: str
    event_date: datetime
    ticket_price: float
    banner_image: str | None
    total_tickets: int
    available_tickets: int
    created_at: datetime


# =========================
# Booking Schemas
# =========================

class BookingCreate(BaseModel):
    event_id: int = Field(
        ...,
        gt=0
    )

    ticket_quantity: int = Field(
        ...,
        gt=0,
        le=10
    )


class BookingResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    event_id: int
    ticket_quantity: int
    total_price: float
    booking_status: BookingStatus
    created_at: datetime


# =========================
# Ticket Schemas
# =========================

class TicketResponse(BaseModel):
    id: int
    booking_id: int
    ticket_code: str
    qr_code_url: str
    created_at: datetime

    # Booking information
    ticket_quantity: int
    total_price: float

    # Event information
    event_id: int
    event_title: str
    event_description: str
    event_category: EventCategory
    event_location: str
    event_date: datetime
    ticket_price: float


# =========================
# Notification Schemas
# =========================

class NotificationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    title: str
    message: str
    type: NotificationType
    is_read: bool
    created_at: datetime