-- Migración 004: Agregar batch_id a marketplace_listings para vincular análisis del lote
ALTER TABLE marketplace_listings
    ADD COLUMN IF NOT EXISTS batch_id UUID REFERENCES batches(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_marketplace_batch_id ON marketplace_listings(batch_id);
