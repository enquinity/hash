class Khash {
    static getKhash(source: string, hashLength: number = 16): string {
        if (typeof source !== 'string') source = (<any>source).toString();
        let sourceLen = source.length;
        let output = '';
        let numSums = Math.ceil(hashLength / 2);
        let weights = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151];
        let weightIdx = (sourceLen + 17) % weights.length;
        for (let i = 0; i < numSums; i++) {
            let sum = 0xB9C5 * weights[i % weights.length];
            for (let j = 0; j < sourceLen; j++) {
                let pos = (i + j) % sourceLen;
                sum += source.charCodeAt(pos) * weights[weightIdx++ % weights.length];
            }
            //sum ^= weights[weightIdx++ % weights.length];
            let sumStr = (sum & 0xFF).toString(16);
            while (sumStr.length < 2) {
                sumStr = '0' + sumStr;
            }
            output += sumStr;
        }
        return output;
    }
}
