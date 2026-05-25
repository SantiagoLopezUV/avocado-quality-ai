-- Migración 003: Crear tabla marketplace_listings para La Plazita
-- Ejecutar: docker exec -i agrodata-db psql -U agrodata_user -d agrodata_db < migrations/003_create_marketplace_listings_table.sql
-- O en Azure: psql $DATABASE_URL < migrations/003_create_marketplace_listings_table.sql

CREATE TABLE IF NOT EXISTS marketplace_listings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    analysis_id     UUID REFERENCES analyses(id) ON DELETE SET NULL,
    farmer_name     VARCHAR(100) NOT NULL,
    title           VARCHAR(200) NOT NULL,
    quantity_kg     FLOAT NOT NULL,
    price_per_kg    FLOAT NOT NULL,
    quality_score   FLOAT,
    ripeness_level  VARCHAR(50),
    damage_level    VARCHAR(50),
    location        TEXT,
    contact_phone   VARCHAR(20),
    description     TEXT,
    status          VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_marketplace_user_id   ON marketplace_listings(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_status    ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_created   ON marketplace_listings(created_at DESC);
