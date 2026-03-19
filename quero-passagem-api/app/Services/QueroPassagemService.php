<?php

namespace App\Services;

use App\Enums\AllowedState;
use App\Repositories\TicketRepository;
use Exception;

class QueroPassagemService
{
    protected $repository;

    public function __construct(TicketRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Obter todas as localizações sem filtro de estado.
     */
    public function getAllLocations(): array
    {
        return $this->repository->getLocations();
    }

    /**
     * Obter apenas localizações de estados permitidos (SP e PR).
     */
    public function getAllowedLocations(): array
    {
        $locations = $this->getAllLocations();
        $allowedStates = AllowedState::values();

        return array_values(array_filter($locations, function ($location) use ($allowedStates) {
            if (!isset($location['name'])) {
                return false;
            }
            $name = strtoupper($location['name']);
            foreach ($allowedStates as $state) {
                if (str_contains($name, ", $state")) {
                    return true;
                }
            }
            return false;
        }));
    }

    /**
     * Buscar passagens com as regras de SP/PR
     */
    public function search(array $data): array
    {
        if (!$this->isStateAllowed($data['origin_state']) || !$this->isStateAllowed($data['destination_state'])) {
            throw new Exception("Busca permitida somente para cidades e rodoviárias de SP e PR.");
        }

        $tickets = $this->repository->searchTickets($data['origin_id'], $data['destination_id'], $data['date']);

        if (!$tickets || !is_array($tickets)) {
            return [];
        }

        $this->sortTicketsByDeparture($tickets);

        return $tickets;
    }

    /**
     * Validar se o estado é permitido usando o Enum.
     */
    protected function isStateAllowed(string $state): bool
    {
        return in_array(strtoupper($state), AllowedState::values(), true);
    }

    /**
     * Buscar Mapa de Assentos
     */
    public function getSeats(string $travelId)
    {
        return $this->repository->getSeatMap($travelId);
    }

    /**
     * Criar Reserva
     */
    public function createBooking(array $data)
    {
        return $this->repository->createBooking($data);
    }

    /**
     * Ordenar os tickets pela data e hora de partida.
     * 
     * @param array $tickets
     * @return void
     */
    protected function sortTicketsByDeparture(array &$tickets): void
    {
        usort($tickets, function (array $a, array $b) {
            $timeA = strtotime(($a['departure']['date'] ?? '') . ' ' . ($a['departure']['time'] ?? ''));
            $timeB = strtotime(($b['departure']['date'] ?? '') . ' ' . ($b['departure']['time'] ?? ''));
            return $timeA <=> $timeB;
        });
    }
}
