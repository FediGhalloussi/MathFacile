#include "modules/integral/generator.h"
#include <sstream>
#include <string>
#include <cstdlib>

std::string generateIntegralExercise() {
    int a = rand() % 6 + 1;  // Coeff de x^2
    int b = rand() % 10;     // Coeff de x
    int c = rand() % 10;     // Constante

    std::stringstream ss;
    ss << a << "x^2 + " << b << "x + " << c;
    return ss.str();
}
