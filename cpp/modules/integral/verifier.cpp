#include "modules/integral/verifier.h"
#include <sstream>
#include <string>
#include <cmath>
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

bool verifyIntegral(const std::string& question, const std::string& answer, std::string* expected) {
    double a, b, c;
    std::sscanf(question.c_str(), "%lfx^2 + %lfx + %lf", &a, &b, &c);

    std::ostringstream oss;
    oss << formatCoefficient(a / 3.0) << "x^3";

    if (b != 0) {
        oss << " + " << formatCoefficient(b / 2.0) << "x^2";
    }
    if (c != 0) {
        oss << " + " << formatCoefficient(c) << "x";
    }

    oss << " + C";
    *expected = oss.str();

    return removeSpaces(answer) == removeSpaces(*expected);
}
