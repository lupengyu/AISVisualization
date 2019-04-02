<?php

return [
    'oracle' => [
        'driver'    => 'oci8',
        'tns'       => env('DB_TNS', ''),
        'host'      => env('DB_LONGRANGE_HOST', ''),
        'port'      => env('DB_LONGRANGE_PORT', '1521'),
        'database'  => env('DB_LONGRANGE_DATABASE', ''),
        'username'  => env('DB_LONGRANGE_USERNAME', ''),
        'password'  => env('DB_LONGRANGE_PASSWORD', ''),
        'charset'   => 'utf8mb4',
        'prefix'    => '',
        'quoting'   => false,
    ],
];
