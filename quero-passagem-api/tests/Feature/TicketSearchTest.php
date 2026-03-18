<?php

namespace Tests\Feature;

use App\Repositories\TicketRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use Tests\TestCase;

class TicketSearchTest extends TestCase
{
    /**
     * Testa se a busca permite SP e PR.
     */
    public function test_search_allows_sp_and_pr(): void
    {
        $mock = Mockery::mock(TicketRepository::class);
        $mock->shouldReceive('searchTickets')->andReturn([
            ['id' => '1', 'departure' => ['date' => '2026-03-24', 'time' => '10:00:00']]
        ]);
        $this->app->instance(TicketRepository::class, $mock);

        $response = $this->postJson('/api/search', [
            'origin_id' => 'CIT_1',
            'origin_state' => 'SP',
            'destination_id' => 'CIT_2',
            'destination_state' => 'PR',
            'date' => '2026-03-24'
        ]);

        $response->assertStatus(200);
        $response->assertJsonFragment(['id' => '1']);
    }

    /**
     * Testa se a busca bloqueia outros estados.
     */
    public function test_search_blocks_other_states(): void
    {
        $response = $this->postJson('/api/search', [
            'origin_id' => 'CIT_1',
            'origin_state' => 'RJ',
            'destination_id' => 'CIT_2',
            'destination_state' => 'PR',
            'date' => '2026-03-24'
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['origin_state']);
        $response->assertJsonFragment(['Busca permitida somente para cidades e rodoviárias de SP e PR.']);
    }

    /**
     * Testa se o endpoint de localizações retorna todas sem filtro de estado.
     */
    public function test_locations_returns_all_without_filter(): void
    {
        $mock = Mockery::mock(TicketRepository::class);
        $mock->shouldReceive('getLocations')->andReturn([
            ['id' => 'CIT_1', 'name' => 'São Paulo, SP'],
            ['id' => 'CIT_3', 'name' => 'Rio de Janeiro, RJ']
        ]);
        $this->app->instance(TicketRepository::class, $mock);

        $response = $this->getJson('/api/locations');

        $response->assertStatus(200);
        $response->assertJsonCount(2);
        $response->assertJsonFragment(['name' => 'Rio de Janeiro, RJ']);
    }
}
