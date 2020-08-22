// TODO 
export enum wMsg {
  WM_CREATE = 0x01,
  WM_DESTROY = 0x02,
  WM_MOVE = 0x0003,

  WM_NCMOUSEMOVE = 0x00A0,//当光标在一个窗口的非客户区内移动时发送此消息给这个窗口 非客户区为：窗体的标题栏及窗 的边框体
  WM_NCLBUTTONDOWN = 0x00A1,//当光标在一个窗口的非客户区同时按下鼠标左键时提交此消息
  WM_NCLBUTTONUP = 0x00A2, //当用户释放鼠标左键同时光标某个窗口在非客户区时发送此消息
  WM_NCLBUTTONDBLCLK = 0x00A3,//当用户双击鼠标左键同时光标某个窗口在非客户区时发送此消息
  WM_NCRBUTTONDOWN = 0x00A4, //当用户按下鼠标右键同时光标又在窗口的非客户区时发送此消息
  WM_NCRBUTTONUP = 0x00A5, //当用户释放鼠标右键同时光标又在窗口的非客户区时发送此消息
  WM_NCRBUTTONDBLCLK = 0x00A6, //当用户双击鼠标右键同时光标某个窗口在非客户区时发送此消息
  WM_NCMBUTTONDOWN = 0x00A7, //当用户按下鼠标中键同时光标又在窗口的非客户区时发送此消息
  WM_NCMBUTTONUP = 0x00A8, //当用户释放鼠标中键同时光标又在窗口的非客户区时发送此消息
  WM_NCMBUTTONDBLCLK = 0x00A9,//当用户双击鼠标中键同时光标又在窗口的非客户区时发送此消息

  WM_KEYDOWN = 0x0100, //按下一个键
  WM_KEYUP = 0x0101, //释放一个键
  WM_CHAR = 0x0102, //按下某键，并已发出WM_KEYDOWN， WM_KEYUP消息
  WM_DEADCHAR = 0x0103, //当用translatemessage函数翻译WM_KEYUP消息时发送此消息给拥有焦点的窗口
  WM_SYSKEYDOWN = 0x0104,//当用户按住ALT键同时按下其它键时提交此消息给拥有焦点的窗口
  WM_SYSKEYUP = 0x0105, //当用户释放一个键同时ALT 键还按着时提交此消息给拥有焦点的窗口
  WM_SYSCHAR = 0x0106,//当WM_SYSKEYDOWN消息被TRANSLATEMESSAGE函数翻译后提交此消息给拥有焦点的窗口

  WM_MOUSEFIRST = 0x0200, //移动鼠标时发生
  WM_MOUSEMOVE = 0x0200,//移动鼠标时发生，同WM_MOUSEFIRST 
  WM_LBUTTONDOWN = 0x0201,//按下鼠标左键
  WM_LBUTTONUP = 0x0202, //释放鼠标左键
  WM_LBUTTONDBLCLK = 0x0203,//双击鼠标左键
  WM_RBUTTONDOWN = 0x0204, //按下鼠标右键
  WM_RBUTTONUP = 0x0205, //释放鼠标右键
  WM_RBUTTONDBLCLK = 0x0206, //双击鼠标右键
  WM_MBUTTONDOWN = 0x0207, //按下鼠标中键
  WM_MBUTTONUP = 0x0208, //释放鼠标中键
  WM_MBUTTONDBLCLK = 0x0209,//双击鼠标中键

  WM_NCHITTEST = 0x0084,//发送到窗口以确定窗口的哪个部分对应于特定的屏幕坐标
  WM_SETCURSOR = 0x0020 //如果鼠标使光标在窗口内移动并且未捕获鼠标输入，则发送到窗口。
}

export enum wParam {
  PWR_OK = 1,
  PWR_FAIL = -1,
  PWR_SUSPENDREQUEST = 1,
  PWR_SUSPENDRESUME = 2,
  PWR_CRITICALRESUME = 3,

  //对应wMsg中的鼠标信息，lParam中则是低位对应窗口左上角x坐标，高位对应窗口左上角y坐标
  MK_CONTROL = 0x0008, // CTRL键按下
  MK_LBUTTON = 0x0001, //鼠标左键按下
  MK_MBUTTON = 0x0010, //鼠标中键按下
  MK_RBUTTON = 0x0002, //鼠标右键按下
  MK_SHIFT = 0x0004,  //SHIFT键按下
  MK_XBUTTON1 = 0x0020,//第一个X按钮按下
  MK_XBUTTON2 = 0x0040,//第二个X按钮按下

  //按键信息 https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
  VK_LBUTTON = 0x01, //鼠标左键
  VK_RBUTTON = 0x02, //鼠标右键
  VK_CANCEL = 0x03, //控制中断处理
  VK_MBUTTON = 0x04, //鼠标中键
  VK_XBUTTON1 = 0x05, //X1鼠标按钮
  VK_XBUTTON2 = 0x06, //X2鼠标按键
  VK_BACK = 0x08, //BACKSPACE键
  VK_TAB = 0x09, //TAB键
  VK_CLEAR = 0x0C, //清除键
  VK_RETURN = 0x0D, //回车键
  VK_SHIFT = 0x10, //SHIFT键
  VK_CONTROL = 0x11, //CTRL键
  VK_MENU = 0x12, //ALT键
  VK_PAUSE = 0x13, //暂停键
  VK_CAPITAL = 0x14, //大写锁定键
  VK_KANA = 0x15, //IME假名模式
  VK_IME_ON = 0x16, //输入法开启
  VK_ESCAPE = 0x1B, //ESC键

  VK_0 = 0x30, //0键
  VK_1 = 0x31, //1键
  VK_2 = 0x32, //2键
  VK_3 = 0x33, //3键
  VK_4 = 0x34, //4键
  VK_5 = 0x35, //5键
  VK_6 = 0x36, //6键
  VK_7 = 0x37, //7键
  VK_8 = 0x38, //8键
  VK_9 = 0x39, //9键
  VK_A = 0x41, //A键
  VK_B = 0x42, //B键
  VK_C = 0x43, //C键
  VK_D = 0x44, //D键
  VK_E = 0x45, //E键
  VK_F = 0x46, //F键
  VK_G = 0x47, //G键
  VK_H = 0x48, //H键
  VK_I = 0x49, //I键
  VK_J = 0x4A, //J键
  VK_K = 0x4B, //K键
  VK_L = 0x4C, //L键
  VK_M = 0x4D, //M键
  VK_N = 0x4E, //N键
  VK_O = 0x4F, //O键
  VK_P = 0x50, //P键
  VK_Q = 0x51, //Q键
  VK_R = 0x52, //R键
  VK_S = 0x53, //S键
  VK_T = 0x54, //T键
  VK_U = 0x55, //U键
  VK_V = 0x56, //V键
  VK_W = 0x57, //W键
  VK_X = 0x58, //X键
  VK_Y = 0x59, //Y键
  VK_Z = 0x5A, //Z键

}
