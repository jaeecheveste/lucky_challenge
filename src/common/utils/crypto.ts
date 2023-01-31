import * as bcrypt from 'bcrypt';

async function hash(password: string, saltOrRounds: number = 10): Promise<string> {
  return bcrypt.hash(password, saltOrRounds);
}

const CryptoUtils = {
  Hash: hash
}

export default CryptoUtils;