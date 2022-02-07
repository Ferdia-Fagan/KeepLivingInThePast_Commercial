import {
    Persisted
} from "../src/TS/background/components/datastores/components/parts/abstract_object_store_parts/layers/layer0_db/store_object/Types";
import {RequiredKeys} from "./utils/Types";

interface X {
    id?: number
}

interface Z {
    id: number
}

interface Y extends X {
    otherData: string
}

type S = Y

type P = RequiredKeys<Y, 'id'>
type L = Persisted<Y>

const l: L = {
    id: 10,
    otherData: ""
}

