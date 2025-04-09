#include "modules/derivative/verifier.h"
#include <sstream>
#include <cmath>
#include <string>
#include <iomanip>
#include <algorithm>

std::string formatCoefficient(double value) {
    std::ostringstream oss;
    if (std::abs(value - std::round(value)) < 1e-8) {
        oss << static_cast<int>(std::round(value));
    } else {
        oss << std::fixed << std::setprecision(2) << value;
    }
    return oss.str();
}

std::string removeSpaces(const std::string& str) {
    std::string result = str;
    result.erase(std::remove_if(result.begin(), result.end(), ::isspace), result.end());
    return result;
}

bool verifyDerivative(const std::string& question, const std::string& answer, std::string* expected) {
    double a, b;
    std::sscanf(question.c_str(), "%lf x^2 + %lf x +", &a, &b);

    std::ostringstream oss;
    double coefX = 2 * a;
    if (coefX == 1) {
        oss << "x";
    } else if (coefX == -1) {
        oss << "-x";
    } else {
        oss << formatCoefficient(coefX) << "x";
    }

    if (b > 0) {
        oss << " + " << formatCoefficient(b);
    } else if (b < 0) {
        oss << " - " << formatCoefficient(-b);
    }

    *expected = oss.str();

    std::string sanitizedAnswer = removeSpaces(answer);
    std::string sanitizedExpected = removeSpaces(*expected);

    return sanitizedAnswer == sanitizedExpected;
}
