import {takeEvery, takeLatest} from "redux-saga/effects";
import {isSchemeLoading} from "../../../entities/scheme/schemeReducer";
import {schemeLoadFile} from "../../../ui/sections/scheme/schemeSection";
import {schemeDisposeSaga} from "./schemeDisposeSaga";
import {schemeLoadFileSaga} from "./schemeLoadFileSaga";

export function* schemeSaga() {
    // @ts-ignore
    yield takeLatest(isSchemeLoading, schemeDisposeSaga);
    yield takeEvery(schemeLoadFile, schemeLoadFileSaga);
}