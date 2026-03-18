<?php

namespace App\Enums;

enum AllowedState: string
{
    case SAO_PAULO = 'SP';
    case PARANA = 'PR';

    /**
     * Retorna os valores dos estados permitidos em um array.
     * 
     * @return array<string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
