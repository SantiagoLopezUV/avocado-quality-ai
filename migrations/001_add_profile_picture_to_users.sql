-- Migration 001: Add profile_picture column to users table
-- Required by: app/models/user.py profile_picture field (merged from Front-end branch)
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_picture TEXT;
