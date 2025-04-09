#pragma once
#include <nlohmann/json.hpp>

class ExerciseLoader {
public:
    static ExerciseLoader& getInstance();

    void setExercises(const nlohmann::json& json);
    const nlohmann::json& getExercises() const;

private:
    nlohmann::json exercises;
};
