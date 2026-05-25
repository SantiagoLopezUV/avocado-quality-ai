-- Migración 005: Tabla de calificaciones de lotes en La Plazita
CREATE TABLE IF NOT EXISTS listing_ratings (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id  UUID        NOT NULL,
    user_id     UUID        NOT NULL,
    stars       SMALLINT    NOT NULL CHECK (stars BETWEEN 1 AND 5),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (listing_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_listing_ratings_listing_id ON listing_ratings(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_ratings_user_id    ON listing_ratings(user_id);
