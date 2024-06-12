import { Tr, Th, Td } from "react-super-responsive-table";
import { v4 as uuidv4 } from "uuid";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { StyledTable, StyledTbody, StyledThead } from "./styles";
import { CustomButton } from "components/CustomButton";
import { formatDateToReadable } from "utils/utils";

export interface ResponsiveTableProps<
  Item extends Record<string, unknown>,
  Header extends Partial<keyof Item>,
  HeaderMapper extends Record<Header, string>,
  idToAction extends keyof Item,
  ActionHandler extends (value: Item[idToAction]) => Promise<void>,
> {
  collection: Item[];
  customHeadersMapper?: HeaderMapper;
  idToAction?: keyof Item;
  actionHandlers?: Array<[idToAction, ActionHandler, string]>;
}

export const ResponsiveTable = <
  Item extends Record<string, unknown>,
  Header extends Partial<keyof Item>,
  HeaderMapper extends Record<Header, string>,
  idToAction extends keyof Item,
  ActionHandler extends (value: Item[idToAction]) => Promise<void>,
>({
  collection,
  customHeadersMapper,
  actionHandlers,
}: ResponsiveTableProps<Item, Header, HeaderMapper, idToAction, ActionHandler>) => {
  const headersToPrint = customHeadersMapper
    ? Object.values(customHeadersMapper)
    : Object.keys(collection[0]);
  const headersToMap = customHeadersMapper
    ? Object.keys(customHeadersMapper)
    : Object.keys(collection[0]);

  const dataHeaders = ["created_at", "updated_at", "Дата заказа"];

  return (
    <StyledTable>
      <StyledThead>
        <Tr key={uuidv4()}>
          {headersToPrint.map((header) => (
            <Th key={uuidv4()}>{header}</Th>
          ))}
          {actionHandlers && actionHandlers.map((row) => <Th key={uuidv4()}>Действие</Th>)}
        </Tr>
      </StyledThead>
      <StyledTbody>
        {collection.map((tr) => (
          <Tr key={uuidv4()}>
            {headersToMap.map((header) => {
              return (
                <Td key={uuidv4()}>
                  {
                    // Для даты отдельное правило ))
                    dataHeaders.includes(header)
                      ? formatDateToReadable(tr[header] as string)
                      : tr[header]
                  }
                </Td>
              );
            })}

            {actionHandlers &&
              actionHandlers.map(([idToAction, handler, textButton]) => (
                <Td key={uuidv4()}>
                  <CustomButton key={uuidv4()} onClick={() => handler(tr[idToAction])}>
                    {textButton}
                  </CustomButton>
                </Td>
              ))}
          </Tr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
};
