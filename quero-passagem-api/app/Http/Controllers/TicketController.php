<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBookingRequest;
use App\Http\Requests\SearchTicketRequest;
use App\Services\QueroPassagemService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class TicketController extends Controller
{
    protected $service;

    public function __construct(QueroPassagemService $service)
    {
        $this->service = $service;
    }

    /**
     * Retorna todas as localizações filtradas por query (se fornecida).
     */
    public function locations(Request $request): JsonResponse
    {
        $query = $request->input('query', '');
        $locations = $this->service->getAllLocations();

        if ($query) {
            $query = strtolower($query);
            $locations = array_filter($locations, fn ($loc) => str_contains(strtolower($loc['name']), $query));
        }

        return response()->json(array_values($locations));
    }

    /**
     * Retorna apenas localizações permitidas (SP/PR) filtradas por query.
     */
    public function allowedLocations(Request $request): JsonResponse
    {
        $query = $request->input('query', '');
        $locations = $this->service->getAllowedLocations();

        if ($query) {
            $query = strtolower($query);
            $locations = array_filter($locations, function ($loc) use ($query) {
                return isset($loc['name']) && str_contains(strtolower($loc['name']), $query);
            });
        }

        $results = array_values($locations);

        if (empty($results) && $query) {
            \Illuminate\Support\Facades\Log::info("Nenhuma localização encontrada para a query: {$query}");
        }

        return response()->json($results);
    }

    public function search(SearchTicketRequest $request): JsonResponse
    {
        try {
            $results = $this->service->search($request->validated());

            return response()->json($results);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function seats($travelId)
    {
        $seats = $this->service->getSeats($travelId);
        return response()->json($seats);
    }

    public function booking(CreateBookingRequest $request)
    {
        $result = $this->service->createBooking($request->validated());
        return response()->json($result);
    }
}
