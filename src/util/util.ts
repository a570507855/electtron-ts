export default {
  toHEX: (HWND: number) => {
    return `DEC: ${HWND}  -  HEX: ${Number(HWND).toString(16).toUpperCase()}`
  },

  /**
   *
   * @param x x坐标  位于低位(二进制中右边)
   * @param y y坐标  位于高位(二进制中左边)
   */
  getLparamPoint(x: number, y: number) {
    return (y << 16) + x
  },
};