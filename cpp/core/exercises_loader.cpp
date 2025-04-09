#include "core/exercises_loader.h"
#include <nlohmann/json.hpp>
#include <iostream>
#include <emscripten.h>

ExerciseLoader& ExerciseLoader::getInstance() {
    static ExerciseLoader instance;
    return instance;
}

void ExerciseLoader::setExercises(const nlohmann::json& json) {
    exercises = json;
}

const nlohmann::json& ExerciseLoader::getExercises() const {
    return exercises;
}

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void loadCategoriesFromJson(const char* jsonStr) {
        try {
            auto& loader = ExerciseLoader::getInstance();
            loader.setExercises(nlohmann::json::parse(jsonStr));
            std::cerr << "[C++] JSON des catégories chargé avec succès" << std::endl;
        } catch (const std::exception& e) {
            std::cerr << "[C++] Erreur de parsing JSON côté C++ : " << e.what() << std::endl;
        }
    }
}