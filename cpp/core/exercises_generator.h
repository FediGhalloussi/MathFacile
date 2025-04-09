#ifndef EXERCISES_GENERATOR_H
#define EXERCISES_GENERATOR_H

#include <string>

extern "C" {
    char* generateExercise(const char* exerciseName);
    const char* verifyAnswer(const char* exercise, const char* question, const char* answer);
}

#endif
