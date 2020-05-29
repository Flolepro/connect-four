import { Round } from 'src/app/models/round'


export class AddRound {
    static readonly type = '[ROUND] Add'

    constructor(public payload: Round) {}
}

export class RemoveRound {
    static readonly type = '[ROUND] Remove'

    constructor(public payload: Round) {}
}

export class UpdateRound {
  static readonly type = '[UPDATE] Remove'

  constructor(public payload: Round) {}
}

export class ClearRound {
  static readonly type = '[CLEAR] Remove'

  constructor() {}
}


