CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roblox_name VARCHAR(50) NOT NULL UNIQUE,  -- 儲存您的帳號 (例如: Justin_chiu27)
    password_hash VARCHAR(255) NOT NULL,      -- 儲存加密後的密碼 (!!絕不能存明文!!)
    position VARCHAR(50) NOT NULL             -- 儲存軍階/職位 (例如: 副指揮官)
);

-- 將 credentials.js 的資料匯入
-- 範例資料 (密碼需要經過加密處理後再存入)
INSERT INTO users (roblox_name, password_hash, position) VALUES
('Justin_chiu27', 'sony9487', '副指揮官');