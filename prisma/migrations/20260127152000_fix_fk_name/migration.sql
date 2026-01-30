-- Rename FK constraint to a consistent name if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'cells_neighborhoods_fkey'
      AND table_schema = 'public'
      AND table_name = 'cells'
  ) THEN
    ALTER TABLE "cells" RENAME CONSTRAINT "cells_neighborhoods_fkey" TO "cells_neighborhood_id_fkey";
  END IF;
END $$;
