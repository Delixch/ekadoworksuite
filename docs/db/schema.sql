-- ============================================================================
-- Punn Digital · Dijital Resepsiyonist paneli · Veritabanı şeması
-- MySQL 8 / MariaDB 10.4+ (phpMyAdmin > İçe Aktar ile çalıştırılır)
-- Alan adları src/lib/panel/types.ts içindeki tiplerle birebir eşleşir (camelCase <-> snake_case).
-- Zamanlar UTC saklanır; ekran otelin saat dilimine çevirir.
-- ============================================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ---------------------------------------------------------------------------
-- Oteller ve kullanıcılar
-- ---------------------------------------------------------------------------
CREATE TABLE hotels (
  id            VARCHAR(32)  PRIMARY KEY,
  name          VARCHAR(160) NOT NULL,
  city          VARCHAR(80)  NOT NULL,
  country       CHAR(2)      NOT NULL,
  currency      ENUM('EUR','CHF','TRY','USD') NOT NULL DEFAULT 'EUR',
  timezone      VARCHAR(48)  NOT NULL DEFAULT 'Europe/Istanbul',
  published     TINYINT(1)   NOT NULL DEFAULT 0,       -- dijital resepsiyonist yayında mı
  published_at  DATETIME     NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(120) NOT NULL,
  role          ENUM('owner','manager','reception','admin') NOT NULL DEFAULT 'reception',
  lang          CHAR(2)      NOT NULL DEFAULT 'tr',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE hotel_users (
  hotel_id VARCHAR(32)  NOT NULL,
  user_id  INT UNSIGNED NOT NULL,
  PRIMARY KEY (hotel_id, user_id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------------
-- Kurulum ekranı (SetupConfig)
-- ---------------------------------------------------------------------------
-- 1) Otel profili
CREATE TABLE hotel_profiles (
  hotel_id    VARCHAR(32) PRIMARY KEY,
  stars       TINYINT UNSIGNED NOT NULL DEFAULT 3,
  address     VARCHAR(220),
  phone       VARCHAR(40),
  email       VARCHAR(190),
  website     VARCHAR(190),
  check_in    TIME NOT NULL DEFAULT '14:00:00',
  check_out   TIME NOT NULL DEFAULT '11:00:00',
  description TEXT,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2) Kanallar (WhatsApp, Instagram, Messenger, telefon, web sohbet)
CREATE TABLE channels (
  hotel_id    VARCHAR(32) NOT NULL,
  channel     ENUM('whatsapp','instagram','messenger','phone','web') NOT NULL,
  connected   TINYINT(1)  NOT NULL DEFAULT 0,
  handle      VARCHAR(160),                  -- numara / kullanıcı adı / alan adı
  credentials JSON NULL,                     -- token vb. (sunucuda şifreli tutulmalı)
  connected_at DATETIME NULL,
  PRIMARY KEY (hotel_id, channel),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3) Diller ve kişilik
CREATE TABLE hotel_languages (
  hotel_id   VARCHAR(32) NOT NULL,
  lang       CHAR(2)     NOT NULL,
  is_default TINYINT(1)  NOT NULL DEFAULT 0,
  PRIMARY KEY (hotel_id, lang),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE persona (
  hotel_id     VARCHAR(32) PRIMARY KEY,
  name         VARCHAR(60) NOT NULL DEFAULT 'Nani',
  tone         TINYINT UNSIGNED NOT NULL DEFAULT 50,   -- 0 resmi ... 100 samimi
  emoji        TINYINT(1)  NOT NULL DEFAULT 1,
  auto_detect_language TINYINT(1) NOT NULL DEFAULT 1,
  greeting     TEXT,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4) Bilgi bankası
CREATE TABLE room_types (
  id              VARCHAR(32) PRIMARY KEY,
  hotel_id        VARCHAR(32) NOT NULL,
  name            VARCHAR(120) NOT NULL,
  capacity        TINYINT UNSIGNED NOT NULL DEFAULT 2,
  price_per_night DECIMAL(10,2) NOT NULL,
  room_count      SMALLINT UNSIGNED NOT NULL DEFAULT 1,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE faqs (
  id        VARCHAR(32) PRIMARY KEY,
  hotel_id  VARCHAR(32) NOT NULL,
  question  VARCHAR(300) NOT NULL,
  answer    TEXT NOT NULL,
  sort      SMALLINT NOT NULL DEFAULT 0,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE policies (
  hotel_id     VARCHAR(32) PRIMARY KEY,
  cancellation TEXT, pets TEXT, breakfast TEXT, parking TEXT, wifi TEXT,
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE knowledge_docs (
  id          VARCHAR(32) PRIMARY KEY,
  hotel_id    VARCHAR(32) NOT NULL,
  name        VARCHAR(220) NOT NULL,
  size_kb     INT UNSIGNED NOT NULL DEFAULT 0,
  storage_url VARCHAR(500),
  indexed_at  DATETIME NULL,                 -- yapay zeka tarafı dosyayı işleyince dolar
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5) İnsana devir kuralları
CREATE TABLE handoff_rules (
  hotel_id     VARCHAR(32) PRIMARY KEY,
  t_complaint      TINYINT(1) NOT NULL DEFAULT 1,
  t_payment        TINYINT(1) NOT NULL DEFAULT 1,
  t_negotiation    TINYINT(1) NOT NULL DEFAULT 0,
  t_medical        TINYINT(1) NOT NULL DEFAULT 1,
  t_low_confidence TINYINT(1) NOT NULL DEFAULT 1,
  t_vip            TINYINT(1) NOT NULL DEFAULT 0,
  confidence   TINYINT UNSIGNED NOT NULL DEFAULT 70,   -- 0-100
  hours_from   TIME NOT NULL DEFAULT '08:00:00',
  hours_to     TIME NOT NULL DEFAULT '23:00:00',
  days         CHAR(7) NOT NULL DEFAULT '1111111',    -- Pzt..Paz
  notify_via   ENUM('whatsapp','email','push') NOT NULL DEFAULT 'whatsapp',
  notify_to    VARCHAR(190),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6) Entegrasyonlar (PMS, akıllı kilit, takvim)
CREATE TABLE integrations (
  hotel_id   VARCHAR(32) NOT NULL,
  kind       ENUM('pms','lock','calendar') NOT NULL,
  provider   VARCHAR(40) NOT NULL DEFAULT 'none',
  connected  TINYINT(1)  NOT NULL DEFAULT 0,
  api_key    VARCHAR(500) NULL,                -- sunucuda şifreli tutulmalı
  options    JSON NULL,                        -- örn. {"autoSendCode": true}
  PRIMARY KEY (hotel_id, kind),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------------
-- Misafirler, konuşmalar, mesajlar (yapay zekanın doldurduğu tablolar)
-- ---------------------------------------------------------------------------
CREATE TABLE guests (
  id         VARCHAR(40) PRIMARY KEY,
  hotel_id   VARCHAR(32) NOT NULL,
  name       VARCHAR(160) NOT NULL,
  lang       CHAR(2) NOT NULL DEFAULT 'en',
  country    CHAR(2),
  email      VARCHAR(190),
  phone      VARCHAR(40),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (hotel_id),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE conversations (
  id              VARCHAR(40) PRIMARY KEY,
  hotel_id        VARCHAR(32) NOT NULL,
  guest_id        VARCHAR(40) NOT NULL,
  channel         ENUM('whatsapp','instagram','messenger','phone','web') NOT NULL,
  status          ENUM('ai','human','waiting','closed') NOT NULL DEFAULT 'ai',
  intent          ENUM('booking','price','complaint','checkin','info','lock','payment') NOT NULL DEFAULT 'info',
  unread          SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  assigned_user_id INT UNSIGNED NULL,           -- devralan personel
  booking_id      VARCHAR(40) NULL,
  last_message_at DATETIME NOT NULL,
  resolved_by_ai  TINYINT(1) NOT NULL DEFAULT 0, -- genel bakış: otomatik çözüm oranı
  first_response_ms INT UNSIGNED NULL,           -- genel bakış: yanıt süresi
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (hotel_id, status),
  INDEX (hotel_id, last_message_at),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
  FOREIGN KEY (guest_id) REFERENCES guests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE messages (
  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  conversation_id VARCHAR(40) NOT NULL,
  sender          ENUM('guest','ai','staff') NOT NULL,
  body            TEXT NOT NULL,
  body_translated TEXT NULL,                    -- misafir mesajının personel diline çevirisi
  lang            CHAR(2) NOT NULL,
  confidence      TINYINT UNSIGNED NULL,        -- AI yanıtının güveni (0-100)
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (conversation_id, created_at),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------------
-- Odalar, rezervasyonlar, akıllı kilitler
-- ---------------------------------------------------------------------------
CREATE TABLE rooms (
  id           VARCHAR(32) PRIMARY KEY,
  hotel_id     VARCHAR(32) NOT NULL,
  room_type_id VARCHAR(32) NOT NULL,
  number       VARCHAR(12) NOT NULL,
  floor        TINYINT NOT NULL DEFAULT 1,
  status       ENUM('occupied','vacant','cleaning','arriving') NOT NULL DEFAULT 'vacant',
  UNIQUE (hotel_id, number),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
  FOREIGN KEY (room_type_id) REFERENCES room_types(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE bookings (
  id           VARCHAR(40) PRIMARY KEY,
  hotel_id     VARCHAR(32) NOT NULL,
  guest_id     VARCHAR(40) NOT NULL,
  room_type_id VARCHAR(32) NOT NULL,
  room_id      VARCHAR(32) NULL,
  check_in     DATE NOT NULL,
  check_out    DATE NOT NULL,
  adults       TINYINT UNSIGNED NOT NULL DEFAULT 1,
  total        DECIMAL(10,2) NOT NULL,
  currency     ENUM('EUR','CHF','TRY','USD') NOT NULL,
  status       ENUM('confirmed','pending','checked_in','checked_out','cancelled') NOT NULL DEFAULT 'pending',
  source       ENUM('ai','web','phone','ota') NOT NULL DEFAULT 'ai',
  conversation_id VARCHAR(40) NULL,
  pms_reference VARCHAR(80) NULL,               -- PMS'teki karşılığı
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (hotel_id, check_in),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
  FOREIGN KEY (guest_id) REFERENCES guests(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE locks (
  id          VARCHAR(40) PRIMARY KEY,
  room_id     VARCHAR(32) NOT NULL UNIQUE,
  provider    ENUM('tuya','ttlock') NOT NULL,
  external_id VARCHAR(120) NOT NULL,            -- Tuya / TTLock cihaz numarası
  battery     TINYINT UNSIGNED NULL,
  online      TINYINT(1) NOT NULL DEFAULT 1,
  locked      TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE temp_codes (
  id          VARCHAR(40) PRIMARY KEY,
  lock_id     VARCHAR(40) NOT NULL,
  booking_id  VARCHAR(40) NULL,
  code        VARCHAR(12) NOT NULL,             -- sunucuda şifreli tutulması önerilir
  valid_from  DATETIME NOT NULL,
  valid_to    DATETIME NOT NULL,
  sent_via    ENUM('whatsapp','instagram','messenger','phone','web') NULL,
  created_by  ENUM('ai','staff') NOT NULL DEFAULT 'ai',
  revoked_at  DATETIME NULL,
  INDEX (lock_id, valid_to),
  FOREIGN KEY (lock_id) REFERENCES locks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE lock_events (
  id        BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lock_id   VARCHAR(40) NOT NULL,
  type      ENUM('unlock_code','unlock_app','unlock_card','unlock_fp','lock','low_battery') NOT NULL,
  actor     VARCHAR(160) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (lock_id, created_at),
  FOREIGN KEY (lock_id) REFERENCES locks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ---------------------------------------------------------------------------
-- İstatistik (genel bakış grafikleri). Gün sonunda toplanır; gerçek zamanlı da hesaplanabilir.
-- ---------------------------------------------------------------------------
CREATE TABLE daily_stats (
  hotel_id         VARCHAR(32) NOT NULL,
  day              DATE NOT NULL,
  conversations    INT UNSIGNED NOT NULL DEFAULT 0,
  ai_bookings      INT UNSIGNED NOT NULL DEFAULT 0,
  avg_response_ms  INT UNSIGNED NOT NULL DEFAULT 0,
  auto_resolved    INT UNSIGNED NOT NULL DEFAULT 0,
  revenue          DECIMAL(12,2) NOT NULL DEFAULT 0,
  by_channel       JSON NULL,                   -- {"whatsapp": 41, "instagram": 17, ...}
  by_language      JSON NULL,                   -- {"de": 28, "en": 24, ...}
  PRIMARY KEY (hotel_id, day),
  FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE audit_log (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  hotel_id   VARCHAR(32) NOT NULL,
  user_id    INT UNSIGNED NULL,
  action     VARCHAR(80) NOT NULL,               -- 'setup.save', 'conversation.takeover', 'code.create' ...
  detail     JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (hotel_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ===========================================================================
-- "TEST ET / CANLI DEMO" SAYFASI (sitedeki herkese açık kurulum ekranı)
-- Otel sahibi adayı formu doldurur; yapay zeka bu bilgilerle demo asistanı hazırlar.
-- Koddaki karşılığı: src/lib/demo/api.ts (DemoInfo)
-- ===========================================================================
CREATE TABLE demo_sessions (
  id           VARCHAR(40)  PRIMARY KEY,           -- demoId
  hotel_name   VARCHAR(160) NOT NULL,              -- "Otelinizin adı" (zorunlu)
  rooms        TEXT         NOT NULL,              -- "Odalar ve fiyatlar" serbest metin (zorunlu)
  food         TEXT         NULL,                  -- "Kahvaltı ve yeme içme"
  location     TEXT         NULL,                  -- "Konum ve ulaşım"
  other        TEXT         NULL,                  -- "Diğer bilgiler"
  lang         CHAR(2)      NOT NULL DEFAULT 'tr', -- sayfanın dili (tr/en/de)
  status       ENUM('preparing','ready','tested') NOT NULL DEFAULT 'preparing',
  tested_via   SET('chat','call','callback') NULL, -- hangi yöntemle denedi
  summary_whatsapp VARCHAR(40) NULL,               -- özet gönderilecek WhatsApp numarası (isteğe bağlı)
  summary_requested TINYINT(1) NOT NULL DEFAULT 0, -- "Demo görüşme özetinin gönderilmesini istiyorum"
  source_ip    VARBINARY(16) NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE demo_messages (                       -- sayfadaki deneme sohbeti
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  demo_id    VARCHAR(40) NOT NULL,
  sender     ENUM('guest','ai') NOT NULL,
  body       TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (demo_id, created_at),
  FOREIGN KEY (demo_id) REFERENCES demo_sessions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE demo_callbacks (                      -- "Dijital resepsiyonistiniz sizi arasın"
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  demo_id    VARCHAR(40) NOT NULL,
  phone      VARCHAR(40) NOT NULL,
  status     ENUM('queued','calling','done','failed') NOT NULL DEFAULT 'queued',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (demo_id) REFERENCES demo_sessions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
