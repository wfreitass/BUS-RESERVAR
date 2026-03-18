<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TicketRepository
{
    protected $baseUrl;
    protected $user;
    protected $pw;
    protected $affiliateCode;

    public function __construct()
    {
        $this->baseUrl = config('services.quero_passagem.base_url');
        $this->user = config('services.quero_passagem.user');
        $this->pw = config('services.quero_passagem.pw');
        $this->affiliateCode = config('services.quero_passagem.affiliate_code');
    }

    /**
     * Autenticação na API Externa
     */
    protected function client()
    {
        return Http::withBasicAuth($this->user, $this->pw);
    }

    /**
     * Listar Cidades e Rodoviárias
     */
    public function getLocations()
    {
        try {
            $response = $this->client()->get("{$this->baseUrl}/stops");

            if ($response->successful()) {
                return $response->json();
            }

            Log::error("Erro ao buscar locais: " . $response->status() . " " . $response->body());
            return [];
        } catch (\Exception $e) {
            Log::error("Erro ao buscar locais: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Buscar passagens (IDA)
     */
    public function searchTickets(string $originId, string $destinationId, string $date)
    {
        try {
            $response = $this->client()->post("{$this->baseUrl}/new/search", [
                'from' => $originId,
                'to' => $destinationId,
                'travelDate' => $date,
                'affiliateCode' => $this->affiliateCode,
                'include-connections' => false
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error("Erro na busca de passagens: " . $response->status() . " " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("Erro na busca de passagens: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Buscar Mapa de Assentos
     */
    public function getSeatMap(string $travelId)
    {
        try {
            $response = $this->client()->post("{$this->baseUrl}/new/seats", [
                'travelId' => $travelId,
                'orientation' => 'horizontal',
                'type' => 'matrix'
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error("Erro ao buscar mapa de assentos: " . $response->status() . " " . $response->body());
            return null;
        } catch (\Exception $e) {
            Log::error("Erro ao buscar mapa de assentos: " . $e->getMessage());
            return null;
        }
    }

    /**
     * Criar reserva de poltronas
     */
    public function createBooking(array $data)
    {
        try {
            $response = $this->client()->post("{$this->baseUrl}/new/booking", [
                'affiliateCode' => $this->affiliateCode,
                'travels' => $data['travels']
            ]);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error("Erro ao criar reserva: " . $response->status() . " " . $response->body());
            return ['error' => true, 'message' => $response->json()['errors'] ?? 'Erro desconhecido na reserva'];
        } catch (\Exception $e) {
            Log::error("Erro ao criar reserva: " . $e->getMessage());
            return ['error' => true, 'message' => $e->getMessage()];
        }
    }
}
