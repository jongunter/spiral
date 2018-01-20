describe("Spiral generator", () => {

    describe("Test input: 200", () => {
        
        it("Produces all numbers 0-200", () => {
            var result = createSpiral(200);
            expect(
                () =>assertAllNumbersPresent(result, 200)
            ).not.toThrow();
        });

        it("Produces the correct shape", ()=> {
            var result = createSpiral(200);
            expect(result.trim()).toBe(getTrimmed200Sprial());
        })


    })

})

function createSpiral(size) {
    const spiral = new Spiral(size);
    const renderer = new StringRenderer(spiral);
    const result = renderer.render();
    return result;
}

function assertAllNumbersPresent(spiralString, upTo) {
    const numbersFound = spiralString
        .split(/\s/)
        .map(s => s.trim())
        .map(s => parseInt(s))
        .filter(n => !isNaN(n));

    for(let i = 0; i <= upTo; i++){
        if(numbersFound.indexOf(i) === -1){
            throw new Error(i + ' not found')
        }
    }
    return true;
}

function getTrimmed200Sprial() {
    var spiral = `
    156 157 158 159 160 161 162 163 164 165 166 167 168 169
    155 110 111 112 113 114 115 116 117 118 119 120 121 170
    154 109 72  73  74  75  76  77  78  79  80  81  122 171
    153 108 71  42  43  44  45  46  47  48  49  82  123 172
    152 107 70  41  20  21  22  23  24  25  50  83  124 173
    151 106 69  40  19  6   7   8   9   26  51  84  125 174
    150 105 68  39  18  5   0   1   10  27  52  85  126 175
    149 104 67  38  17  4   3   2   11  28  53  86  127 176
    148 103 66  37  16  15  14  13  12  29  54  87  128 177
200 147 102 65  36  35  34  33  32  31  30  55  88  129 178
199 146 101 64  63  62  61  60  59  58  57  56  89  130 179
198 145 100 99  98  97  96  95  94  93  92  91  90  131 180
197 144 143 142 141 140 139 138 137 136 135 134 133 132 181
196 195 194 193 192 191 190 189 188 187 186 185 184 183 182`;
return spiral.trim();
}



