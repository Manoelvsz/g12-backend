-- Add optional name to cell requests
ALTER TABLE "cell_requests" ADD COLUMN IF NOT EXISTS "name" TEXT;
