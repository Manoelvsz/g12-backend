-- Ensure cells table exists (shadow DB friendly)
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'neighborhoods'
	) THEN
		CREATE TABLE "neighborhoods" (
			"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			"name" TEXT NOT NULL,
			"city" TEXT NOT NULL DEFAULT 'Salvador',
			"state" TEXT NOT NULL DEFAULT 'BA',
			"created_at" TIMESTAMPTZ DEFAULT NOW(),
			"updated_at" TIMESTAMPTZ DEFAULT NOW()
		);
		CREATE UNIQUE INDEX IF NOT EXISTS "neighborhoods_name_city_state_key" ON "neighborhoods" ("name", "city", "state");
		CREATE INDEX IF NOT EXISTS "idx_neighborhoods_city_state" ON "neighborhoods" ("city", "state");
		CREATE INDEX IF NOT EXISTS "idx_neighborhoods_name" ON "neighborhoods" ("name");
	END IF;

	IF NOT EXISTS (
		SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'cells'
	) THEN
		CREATE TABLE "cells" (
			"id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			"name" TEXT NOT NULL,
			"neighborhood_id" UUID NOT NULL,
			"cep" TEXT,
			"address" TEXT,
			"leader" TEXT,
			"generation" TEXT,
			"network" TEXT,
			"latitude" DECIMAL(10, 8),
			"longitude" DECIMAL(11, 8),
			"created_at" TIMESTAMPTZ DEFAULT NOW(),
			"updated_at" TIMESTAMPTZ DEFAULT NOW(),
			CONSTRAINT "cells_neighborhoods_fkey" FOREIGN KEY ("neighborhood_id") REFERENCES "neighborhoods" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
		);
		CREATE INDEX IF NOT EXISTS "idx_cells_coordinates" ON "cells" ("latitude", "longitude");
		CREATE INDEX IF NOT EXISTS "idx_cells_name" ON "cells" ("name");
		CREATE INDEX IF NOT EXISTS "idx_cells_neighborhood_id" ON "cells" ("neighborhood_id");
		CREATE UNIQUE INDEX IF NOT EXISTS "cells_name_neighborhood_id_key" ON "cells" ("name", "neighborhood_id");
	END IF;
END $$;

-- Add leader, generation, and network columns to cells
ALTER TABLE "cells" ADD COLUMN IF NOT EXISTS "leader" text;
ALTER TABLE "cells" ADD COLUMN IF NOT EXISTS "generation" text;
ALTER TABLE "cells" ADD COLUMN IF NOT EXISTS "network" text;

-- Optional index to speed up filtering by network
CREATE INDEX IF NOT EXISTS "idx_cells_network" ON "cells" ("network");
