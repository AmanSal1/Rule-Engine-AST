// node.js implementation of AST Node
class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type; // 'operator' or 'operand'
    this.left = left; // Left child (Node)
    this.right = right; // Right child (Node)
    this.value = value; // Value for operand (e.g., 'age > 30') or operator ('AND'/'OR')
  }

  evaluate(data) {
    if (this.type === "operand") {
      return this._evaluateOperand(this.value, data);
    } else if (this.type === "operator") {
      if (this.value === "AND") {
        return this.left.evaluate(data) && this.right.evaluate(data);
      } else if (this.value === "OR") {
        return this.left.evaluate(data) || this.right.evaluate(data);
      }
    }
    throw new Error(`Invalid node type: ${this.type}`);
  }

  _evaluateOperand(condition, data) {
    const [attribute, operator, value] = this._parseCondition(condition);
    const dataValue = data[attribute];

    if (dataValue === undefined) {
      throw new Error(`Attribute ${attribute} not found in data`);
    }

    switch (operator) {
      case ">":
        return dataValue > value;
      case "<":
        return dataValue < value;
      case ">=":
        return dataValue >= value;
      case "<=":
        return dataValue <= value;
      case "==":
        return dataValue == value; // Use == for loose equality to allow string comparison
      case "!=":
        return dataValue != value; // Use != for loose inequality to allow string comparison
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }

  _parseCondition(condition) {
    const regex = /(\w+)\s*(==|!=|>=|<=|>|<)\s*([^'"\s]+|"[^"]*"|'[^']*')/;
    const match = condition.match(regex);

    if (!match) throw new Error(`Invalid condition: ${condition}`);

    let [_, attribute, operator, value] = match;

    // Remove quotes from string values
    if (value.startsWith('"') || value.startsWith("'")) {
      value = value.slice(1, -1); // Strip quotes from the string
    } else {
      value = isNaN(value) ? value : parseFloat(value); // Convert to number if possible
    }

    return [attribute, operator, value];
  }
}

module.exports = Node;
