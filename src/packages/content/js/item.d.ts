export interface StoredCharacter {
  readonly adventure: string
  readonly date: number
  readonly id: string
  readonly job: string
  readonly level: string
  readonly name: string
  readonly server: string
}

export interface Character {
  readonly characterID: string
  readonly characterName: string
  readonly adventure: string
  readonly level: number
  readonly job: string
  readonly server: string
}

export interface RuntimeCharacter extends Character {
  element?: HTMLDivElement
  buttonElement?: HTMLButtonElement
  isStored?: boolean
}
