#include "modules/quadratic/generator.h"
#include <string>
#include <sstream>
#include <cstdlib>

std::string generateQuadraticEquation() {
    int a = rand() % 5 + 1; // éviter 0
    int b = rand() % 10;
    int c = rand() % 10;
    std::stringstream ss;
    ss << a << "x^2 + " << b << "x + " << c << " = 0";
    return ss.str();
}
