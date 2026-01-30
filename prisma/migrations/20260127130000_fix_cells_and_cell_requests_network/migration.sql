-- Ensure network column exists on cell_requests
ALTER TABLE "cell_requests" ADD COLUMN IF NOT EXISTS "network" TEXT;

-- (Cells already have network; keep index for filtering)
CREATE INDEX IF NOT EXISTS "idx_cells_network" ON "cells" ("network");
