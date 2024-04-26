function PrintOneDemArray(arr) {
  printToTextarea(arr.join(""));
  printToTextarea("\n");
}

function printToTextarea(text) {
  const textarea = document.getElementById("output");
  textarea.value += text + "\n";
}

function clicks() {
  const Xk = "100000001"; // произвольно заданное инф. слово Xk
  const Gx = "10101"; // полином x^5+x^4+x^3+x+1

  const k = Xk.length;
  const r = 4;
  const n = r + k;

  const XkInArray = StringInArray(Array(k), Xk);
  const GxInArray = StringInArray(Array(Gx.length), Gx);
  const arrayXn = new Array(n).fill(0);

  printToTextarea("Информационное слово: " + Xk);
  printToTextarea("Порождающий полином: " + Gx);
  printToTextarea(`k = ${k}`);
  printToTextarea(`r = ${r}`);
  printToTextarea(`n = ${n}`);

  printToTextarea(`\nПорождающая матрица ${n},${k}:`);
  let generatingMatrixG = Array(k)
    .fill(null)
    .map(() => Array(n).fill(0));
  generatingMatrixG = CreateGeneratingMatrixG(
    generatingMatrixG,
    GxInArray,
    k,
    n
  );
  PrintMatrix(generatingMatrixG, k, n);

  printToTextarea(`\nКаноническая порождающая матрица ${n},${k}:`);
  generatingMatrixG = CreateCanonicalMatrixGk(generatingMatrixG, k, n);
  PrintMatrix(generatingMatrixG, k, n);

  printToTextarea("\nПроверочная матрица:");
  let verifiMatrixH = Array(n)
    .fill(null)
    .map(() => Array(r).fill(0));
  verifiMatrixH = CreateVerificationMatrixH(
    verifiMatrixH,
    generatingMatrixG,
    k,
    n
  );
  PrintMatrix(verifiMatrixH, n, r);

  printToTextarea("\nКаноническая проверочная матрица:");
  const transponH = [
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  ];
  for (let i = 0; i < r; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
      row += transponH[i][j].toString();
      if (j + 1 === k) row += "|";
    }
    printToTextarea(row);
  }

  printToTextarea("\nОперация деления");
  printToTextarea(
    `Осуществляем умножение полинома на x^r: сдвиг полинома на r = ${r} разрядов влево -> младшие разряды заполняются нулями`
  );

  PolynomialMultiplication(arrayXn, XkInArray, 8);

  SearchForResidue(arrayXn, GxInArray);

  printToTextarea("Остаток:");
  PrintOneDemArray(arrayXn);

  printToTextarea("Итоговое слово:");
  PolynomialMultiplication(arrayXn, XkInArray, r);
  PrintOneDemArray(arrayXn);

  try {
    const choice = parseInt(prompt("Количество ошибок: 0, 1, 2?"));
    let errorPosition;
    switch (choice) {
      case 0:
        printToTextarea("В слове нет ошибок");
        printToTextarea("S = 00000 -> ошибок нет\nYn:");
        PrintOneDemArray(arrayXn);
        break;
      case 1:
        errorPosition = Math.floor(Math.random() * 13);
        printToTextarea(`Ошибка в позиции: ${errorPosition + 1}`);
        printToTextarea("Yn:");
        if (arrayXn[errorPosition] === 1) arrayXn[errorPosition] = 0;
        else arrayXn[errorPosition] = 1;
        PrintOneDemArray(arrayXn);
        SearchAndCorrectError(arrayXn, GxInArray, verifiMatrixH, r);
        break;
      case 2:
        errorPosition = Math.floor(Math.random() * 13);
        printToTextarea(`Ошибка в позиции: ${errorPosition + 1}`);
        if (arrayXn[errorPosition] === 1) arrayXn[errorPosition] = 0;
        else arrayXn[errorPosition] = 1;
        errorPosition = Math.floor(Math.random() * 13);
        printToTextarea(`Ошибка в позиции: ${errorPosition + 1}`);
        if (arrayXn[errorPosition] === 1) arrayXn[errorPosition] = 0;
        else arrayXn[errorPosition] = 1;
        printToTextarea("Yn:");
        PrintOneDemArray(arrayXn);
        SearchAndCorrectError(arrayXn, GxInArray, verifiMatrixH, r);
        break;
      default:
        printToTextarea("!Количество ошибок принимает значения 0,1,2!");
        break;
    }
  } catch (error) {
    printToTextarea("Что-то пошло не так с указанием позиции ошибки");
  }
}

function PolynomialMultiplication(shiftArr, arr, r) {
  for (let i = 0; i < arr.length; i++) {
    shiftArr[i] = arr[i];
  }
  return shiftArr;
}

function SearchAndCorrectError(arrXn, arrXr, verifMatrix, r) {
  const n = arrXn.length;
  const k = n - r;

  const arrXnSecond = [...arrXn];

  printToTextarea("<---Результат операции деления--->");
  SearchForResidue(arrXnSecond, arrXr);

  printToTextarea("Остаток от деления R(X) ~ синдром (S):");
  PrintOneDemArray(arrXnSecond);

  for (let i = 0; i < n; i++) {
    let coincidence = 0;
    for (let j = 0; j < r; j++) {
      if (verifMatrix[i][j] === arrXnSecond[k + j]) {
        coincidence++;
      }
    }
    if (coincidence === r) {
      arrXn[i] = (arrXn[i] + 1) % 2;
      break;
    }
  }
  printToTextarea("Yn':");
  PrintOneDemArray(arrXn);

  return arrXn;
}

function SearchForResidue(arrXn, ArrGx) {
  const end = arrXn.length - ArrGx.length + 1;

  for (let i = 0; i < end; i++) {
    if (arrXn[i] === 1) {
      SumArrXOR(arrXn, ArrGx, i);
    }
  }
  return arrXn;
}

function SumArrXOR(mas1, mas2, pos) {
  const end = pos + mas2.length;

  for (let i = pos; i < end; i++) {
    mas1[i] = (mas1[i] + mas2[i - pos]) % 2;
  }
  return mas1;
}

function StringInArray(arr, str) {
  for (let i = 0; i < str.length; i++) {
    arr[i] = str[i] === "1" ? 1 : 0;
  }
  return arr;
}

function PrintMatrix(matrix, k, n) {
  for (let i = 0; i < k; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
      row += matrix[i][j].toString();
      if (j + 1 === k) row += "|";
    }
    printToTextarea(row);
  }
}

function CreateGeneratingMatrixG(generMatrix, arr, k, n) {
  for (let i = 0; i < n; i++) {
    if (i < arr.length) {
      generMatrix[0][i] = arr[i];
    } else {
      generMatrix[0][i] = 0;
    }
  }

  for (let i = 1; i < k; i++) {
    for (let j = 0; j < n - 1; j++) {
      generMatrix[i][j + 1] = generMatrix[i - 1][j];
    }
    generMatrix[i][0] = generMatrix[i - 1][n - 1];
  }
  return generMatrix;
}

function CreateCanonicalMatrixGk(generationMatrix, k, n) {
  for (let i = 0; i < k; i++) {
    let i2 = i + 1;
    for (let j = i + 1; j < k; j++) {
      if (generationMatrix[i][j] === 1) {
        for (; i2 < k; i2++) {
          let repeat = false;
          if (generationMatrix[i2][j] === 1) {
            for (let j2 = j - 1; j2 > 0; j2--) {
              if (generationMatrix[i2][j2] === 1) {
                repeat = true;
              }
            }
            if (repeat) continue;
            AddingLinesMatrixMod2(generationMatrix, i, i2, n);
            i2++;
            break;
          }
        }
      }
    }
  }
  return generationMatrix;
}

function AddingLinesMatrixMod2(matrix, str1, str2, lengthString) {
  for (let i = 0; i < lengthString; i++) {
    matrix[str1][i] = (matrix[str1][i] + matrix[str2][i]) % 2;
  }
  return matrix;
}

function CreateVerificationMatrixH(checkMatrix, generationMatrix, k, n) {
  const r = n - k;

  for (let i = 0; i < k; i++) {
    for (let j = 0; j < r; j++) {
      checkMatrix[i][j] = generationMatrix[i][k + j];
    }
  }
  for (let i = k; i < n; i++) {
    for (let j = 0; j < r; j++) {
      if (j === i - k) {
        checkMatrix[i][j] = 1;
      } else {
        checkMatrix[i][j] = 0;
      }
    }
  }
  return checkMatrix;
}
