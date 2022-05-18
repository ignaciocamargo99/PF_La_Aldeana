import BeShowed from "common/BeShowed";
import React from "react";
import DescriptionSupply from "views/RegisterSupply/components/DescriptionSupply";
import NameSupply from "views/RegisterSupply/components/NameSupply";
import SinglePrice from "views/RegisterSupply/components/SinglePrice";
import MultiplePrice from "views/RegisterSupply/components/MultiplePrice";
import TypeSupply from "views/RegisterSupply/components/TypeSupply";
import Stock from "views/RegisterSupply/components/Stock";

const DataSupply = ({ load, supply }) => {

    return (
        <>
            <NameSupply load={(childData) => load(childData)} data={supply} />
            <DescriptionSupply load={(childData) => load(childData)} data={supply} />
            <BeShowed show={supply.price_wholesale && supply.reading}>
                <SinglePrice load={(childData) => load(childData)} data={supply} />
            </BeShowed>
            <BeShowed show={supply.price_retail && supply.reading}>
                <MultiplePrice load={(childData) => load(childData)} data={supply} />
            </BeShowed>
            <TypeSupply load={(childData) => load(childData)} data={supply} />



            <BeShowed show={supply.reading}>
                <BeShowed show={supply.stock_lot}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="lotStock">Stock lotes*</label>
                        </div>
                        <div className="form-control-input">
                            <input className="form-control is-valid" id="lotStock" type="number" min="1" value={supply.stock_lot} readOnly />
                        </div>
                    </div>
                </BeShowed>

                <BeShowed show={supply.unit_x_lot}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="unitsPerLot">Cant. unidades por lote*</label>
                        </div>
                        <div className="form-control-input">
                            <input className="form-control is-valid" id="unitsPerLot" type="number" min="1" value={supply.unit_x_lot} readOnly />
                        </div>
                    </div>
                </BeShowed>

                <BeShowed show={supply.stock_unit}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="supplyStock">Stock actual en unidades del insumo*</label>
                        </div>
                        <div className="form-control-input">
                            <input className="form-control is-valid" id="supplyStock" type="number" min="1" value={supply.stock_unit} readOnly />
                        </div>
                    </div>
                </BeShowed>
            </BeShowed>
            <BeShowed show={!supply.reading}>
                <Stock load={(childData) => load(childData)} data={supply} />
            </BeShowed>
        </>
    );
}

export default DataSupply;