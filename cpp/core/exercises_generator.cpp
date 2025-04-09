#include <string>
#include <cstdlib>
#include <ctime>
#include <unordered_map>
#include <functional>
#include <iostream>
#include <sstream>
#include <cstring>

#include "core/exercises_generator.h"
#include "core/exercises_loader.h"

#include "modules/linear/generator.h"
#include "modules/linear/verifier.h"
#include "modules/quadratic/generator.h"
#include "modules/quadratic/verifier.h"
#include "modules/derivative/generator.h"
#include "modules/derivative/verifier.h"


using VerifyFunction = std::function<bool(const std::string&, const std::string&, std::string*)>;

std::unordered_map<std::string, VerifyFunction> verifyFunctions;
const double EPSILON = 1e-6;

extern "C" char* generateExercise(const char* exerciseName) {
    srand(time(nullptr));
    std::string result;

    std::string name(exerciseName);
    if (name == "ln-eqn") {
        result = generateLinearEquation();
    } else if (name == "deriv") {
        result = generateDerivativeExercise();
    } else {
        result = "Exercice non reconnu";
    }

    char* buffer = (char*)malloc(result.size() + 1);
    std::strcpy(buffer, result.c_str());

    return buffer;
}

extern "C" const char* verifyAnswer(const char* exercise, const char* question, const char* answer) {
    static std::string lastResult;

    std::string ex = exercise;
    std::string q = question;
    std::string a = answer;

    std::string expected;

    if (ex == "ln-eqn") {
        bool ok = verifyLinearEquation(q, a, &expected);
        lastResult = "{ \"correct\": " + std::string(ok ? "true" : "false") + ", \"expected\": \"" + expected + "\" }";
        return lastResult.c_str();
    } else if (ex == "deriv") {
        bool ok = verifyDerivative(q, a, &expected);
        lastResult = "{ \"correct\": " + std::string(ok ? "true" : "false") + ", \"expected\": \"" + expected + "\" }";
        return lastResult.c_str();
    }

    lastResult = "{ \"correct\": false, \"error\": \"unknown exercise\" }";
    return lastResult.c_str();
}
