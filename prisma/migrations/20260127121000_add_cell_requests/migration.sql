-- Add cep column to cells
ALTER TABLE "cells" ADD COLUMN IF NOT EXISTS "cep" TEXT;

-- Create cell_requests table
CREATE TABLE IF NOT EXISTS "cell_requests" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "cep" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DECIMAL(10, 8) NOT NULL,
    "longitude" DECIMAL(11, 8) NOT NULL,
    "neighborhood_id" UUID,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS "idx_cell_requests_status" ON "cell_requests" ("status");
CREATE INDEX IF NOT EXISTS "idx_cell_requests_neighborhood" ON "cell_requests" ("neighborhood_id");
