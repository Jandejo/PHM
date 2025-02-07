import math

def mostrar_menu():
    print("Calculadora Científica")
    print("1. Suma")
    print("2. Resta")
    print("3. Multiplicación")
    print("4. División")
    print("5. Seno")
    print("6. Coseno")
    print("7. Tangente")
    print("8. Logaritmo (base 10)")
    print("9. Exponencial (e^x)")
    print("10. Raíz cuadrada")
    print("11. Salir")

def suma(a, b):
    return a + b

def resta(a, b):
    return a - b

def multiplicacion(a, b):
    return a * b

def division(a, b):
    if b == 0:
        return "Error: División por cero"
    return a / b

def seno(x):
    return math.sin(math.radians(x))

def coseno(x):
    return math.cos(math.radians(x))

def tangente(x):
    return math.tan(math.radians(x))

def logaritmo(x):
    if x <= 0:
        return "Error: Logaritmo de número no positivo"
    return math.log10(x)

def exponencial(x):
    return math.exp(x)

def raiz_cuadrada(x):
    if x < 0:
        return "Error: Raíz cuadrada de número negativo"
    return math.sqrt(x)

def main():
    while True:
        mostrar_menu()
        opcion = input("Selecciona una opción: ")

        if opcion == '11':
            print("Saliendo de la calculadora...")
            break

        if opcion in ['1', '2', '3', '4']:
            try:
                num1 = float(input("Ingresa el primer número: "))
                num2 = float(input("Ingresa el segundo número: "))
            except ValueError:
                print("Error: Ingresa números válidos")
                continue

            if opcion == '1':
                print(f"Resultado: {suma(num1, num2)}")
            elif opcion == '2':
                print(f"Resultado: {resta(num1, num2)}")
            elif opcion == '3':
                print(f"Resultado: {multiplicacion(num1, num2)}")
            elif opcion == '4':
                print(f"Resultado: {division(num1, num2)}")

        elif opcion in ['5', '6', '7', '8', '9', '10']:
            try:
                num = float(input("Ingresa el número: "))
            except ValueError:
                print("Error: Ingresa un número válido")
                continue

            if opcion == '5':
                print(f"Resultado: {seno(num)}")
            elif opcion == '6':
                print(f"Resultado: {coseno(num)}")
            elif opcion == '7':
                print(f"Resultado: {tangente(num)}")
            elif opcion == '8':
                print(f"Resultado: {logaritmo(num)}")
            elif opcion == '9':
                print(f"Resultado: {exponencial(num)}")
            elif opcion == '10':
                print(f"Resultado: {raiz_cuadrada(num)}")

        else:
            print("Opción no válida. Intenta de nuevo.")

if __name__ == "__main__":
    main()