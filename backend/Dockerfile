FROM python:3.11-slim

# Set working directory to /backend
WORKDIR /backend

# Copy backend code
COPY ./backend /backend

# Copy the .env file to expected location for database.py
COPY ./database/.env /database/.env

# Install dependencies
COPY ./backend/requirements.txt /backend/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Environment for better logs etc.
ENV PYTHONUNBUFFERED=1

# Expose FastAPI dev port
EXPOSE 8000

# Default command (reload for dev)
CMD ["uvicorn", "views.main:animal_shelter", "--host", "0.0.0.0", "--port", "8000", "--reload"]
