<?php

namespace Tests\Unit;

use App\Repositories\TicketRepository;
use App\Services\QueroPassagemService;
use Mockery;
use PHPUnit\Framework\TestCase;

class TicketServiceTest extends TestCase
{
    /**
     * Testa se o service ordena por horário de embarque.
     */
    public function test_service_orders_by_departure_time(): void
    {
        $mockRepo = Mockery::mock(TicketRepository::class);
        $mockRepo->shouldReceive('searchTickets')->andReturn([
            [
                'id' => 'later',
                'departure' => ['date' => '2026-03-24', 'time' => '22:00:00']
            ],
            [
                'id' => 'earlier',
                'departure' => ['date' => '2026-03-24', 'time' => '08:00:00']
            ],
            [
                'id' => 'middle',
                'departure' => ['date' => '2026-03-24', 'time' => '15:00:00']
            ]
        ]);

        $service = new QueroPassagemService($mockRepo);
        $results = $service->search([
            'origin_state' => 'SP',
            'destination_state' => 'PR',
            'origin_id' => 'CIT_1',
            'destination_id' => 'CIT_2',
            'date' => '2026-03-24'
        ]);

        $this->assertEquals('earlier', $results[0]['id']);
        $this->assertEquals('middle', $results[1]['id']);
        $this->assertEquals('later', $results[2]['id']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
    }
}
