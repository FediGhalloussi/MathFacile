#include "modules/linear/generator.h"
#include <string>
#include <sstream>
#include <cstdlib>

std::string generateLinearEquation() {
    int a = rand() % 10 + 1; // éviter 0
    int b = rand() % 10;

    std::stringstream ss;
    ss << a << "x + " << b << " = 0";
    return ss.str();
}
