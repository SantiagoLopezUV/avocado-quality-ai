-- Migración 002: Crear tabla batches para gestión de lotes
-- Ejecutar: docker exec -i agrodata-db psql -U agrodata_user -d agrodata_db < migrations/002_create_batches_table.sql
-- O contra Azure: psql $DATABASE_URL < migrations/002_create_batches_table.sql

CREATE TABLE IF NOT EXISTS batches (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(100) NOT NULL,
    total_count INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Agregar columna batch_id a analyses si no existe
ALTER TABLE analyses
    ADD COLUMN IF NOT EXISTS batch_id UUID REFERENCES batches(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_batches_user_id ON batches(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_batch_id ON analyses(batch_id);
