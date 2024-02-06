<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('beca_ocde', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('beca_id');
            $table->foreign('beca_id')
                ->references('id')
                ->on('becas')
                ->onDelete('cascade');
            $table->unsignedBigInteger('ocde_id')->nullable();
            $table->foreign('ocde_id')
                ->references('id')
                ->on('ocdes')
                ->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('beca_ocde');
    }
};
