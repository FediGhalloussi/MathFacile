#include "modules/derivative/generator.h"
#include <sstream>
#include <string>
#include <sstream>
#include <cstdlib>

std::string generateDerivativeExercise() {
    int a = rand() % 6 + 1;
    int b = rand() % 10;
    int c = rand() % 10;

    std::stringstream ss;
    ss << a << "x^2 + " << b << "x + " << c;
    return ss.str();
}
