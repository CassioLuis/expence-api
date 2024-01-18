export default interface ITokenHandlerAdapter {
  generateToken: (data: Record<string, any>) => string
  verifyToken: (token: string) => Record<string, any> | null
}
