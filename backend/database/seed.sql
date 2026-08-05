USE income_tax_system;

INSERT INTO users
(
    full_name,
    email,
    password,
    phone,
    nid,
    role,
    is_verified
)

VALUES

(
    'Rafy Hossain',
    'rafy@gmail.com',
    '12345678',
    '01711111111',
    '1234567890',
    'user',
    FALSE
),

(
    'Sohag Hossain',
    'sohag@gmail.com',
    '12345678',
    '01812345678',
    '9876543210123',
    'user',
    FALSE
);