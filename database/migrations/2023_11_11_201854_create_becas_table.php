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
        Schema::create('becas', function (Blueprint $table) {
            $table->id();
            $table->string('institution', 200);
            $table->string('name', 200);
            $table->text('summary');
            $table->string('type',50);
            $table->string('obligation',200);
            $table->string('region', 100);
            $table->date('start_date');
            $table->date('end_date');
            $table->double('budget');
            $table->boolean('status');
            $table->text('others');
            $table->text('link');
            $table->string('file_path')->nullable();
            //foreign keys
            $table->unsignedBigInteger('country_id')->nullable();
            $table->foreign('country_id')
                ->references('id')
                ->on('countrys')
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
        Schema::dropIfExists('becas');
    }
};
