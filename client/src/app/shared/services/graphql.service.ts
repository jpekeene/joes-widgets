import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { Manufacturer, Widget, WidgetType } from '../types/interfaces';

@Injectable({
    providedIn: 'root',
})
export class GraphqlService {
    constructor(private apollo: Apollo) {}

    public getWidgets(typeFilterId?: string, manufacturerFilterId?: string) {
        const query = gql`
            query Widgets($where: WidgetWhere) {
                widgets(where: $where) {
                    id
                    name
                    stockLevel
                    manufacturer {
                        id
                        name
                    }
                    type {
                        id
                        name
                    }
                }
            }
        `;

        let variables = { where: {} };
        if (typeFilterId) {
            variables.where = {
                ...variables.where,
                typeConnection: {
                    node: {
                        id: typeFilterId,
                    },
                },
            };
        }

        if (manufacturerFilterId) {
            variables.where = {
                ...variables.where,
                manufacturerConnection: {
                    node: {
                        id: manufacturerFilterId,
                    },
                },
            };
        }

        return this.apollo
            .watchQuery({
                fetchPolicy: 'no-cache',
                query,
                variables,
            })
            .valueChanges.pipe(map((results) => (results as ApolloQueryResult<{ widgets: Widget[] }>).data.widgets));
    }

    public getWidget(id: string) {
        const query = gql`
            query Query($where: WidgetWhere) {
                widgets(where: $where) {
                    id
                    name
                    stockLevel
                    type {
                        id
                        name
                    }
                    manufacturer {
                        id
                        name
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery({
                fetchPolicy: 'no-cache',
                query,
                variables: {
                    where: {
                        id,
                    },
                },
            })
            .valueChanges.pipe(map((results) => (results as ApolloQueryResult<{ widgets: Widget[] }>).data.widgets[0]));
    }

    public addWidget({
        name,
        stockLevel,
        manufacturerId,
        widgetTypeId,
    }: {
        name: string;
        stockLevel: number;
        manufacturerId: string;
        widgetTypeId: string;
    }) {
        const mutation = gql`
            mutation Mutation($input: [WidgetCreateInput!]!) {
                createWidgets(input: $input) {
                    widgets {
                        name
                        stockLevel
                    }
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                input: [
                    {
                        name: name,
                        stockLevel: stockLevel,
                        manufacturer: {
                            connect: {
                                where: {
                                    node: {
                                        id: manufacturerId,
                                    },
                                },
                            },
                        },
                        type: {
                            connect: {
                                where: {
                                    node: {
                                        id: widgetTypeId,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    public updateWidget(
        widgetId: string,
        updatedWidget: { name?: string; stockLevel?: number; manufacturerId?: string; widgetTypeId?: string },
    ) {
        const mutation = gql`
            mutation UpdateWidgets(
                $where: WidgetWhere
                $disconnect: WidgetDisconnectInput
                $connect: WidgetConnectInput
                $update: WidgetUpdateInput
            ) {
                updateWidgets(where: $where, disconnect: $disconnect, connect: $connect, update: $update) {
                    widgets {
                        id
                        name
                        stockLevel
                        manufacturer {
                            id
                            name
                        }
                        type {
                            id
                            name
                        }
                    }
                }
            }
        `;

        const vars = {
            where: {
                id: widgetId,
            },
            update: {
                name: updatedWidget.name,
                stockLevel: updatedWidget.stockLevel,
            },
            disconnect: {
                manufacturer: {
                    where: {
                        NOT: {
                            node: {
                                id: updatedWidget.manufacturerId,
                            },
                        },
                    },
                },
                type: {
                    where: {
                        NOT: {
                            node: {
                                id: updatedWidget.widgetTypeId,
                            },
                        },
                    },
                },
            },
            connect: {
                manufacturer: {
                    overwrite: true,
                    where: {
                        node: {
                            id: updatedWidget.manufacturerId,
                        },
                    },
                },
                type: {
                    where: {
                        node: {
                            id: updatedWidget.widgetTypeId,
                        },
                    },
                    overwrite: true,
                },
            },
        };

        return this.apollo.mutate({
            mutation,
            variables: vars,
        });
    }

    public deleteWidget(widgetId: string) {
        const mutation = gql`
            mutation DeleteWidgets($where: WidgetWhere) {
                deleteWidgets(where: $where) {
                    nodesDeleted
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                where: {
                    id: widgetId,
                },
            },
        });
    }

    public getManufacturers() {
        const query = gql`
            query Query {
                manufacturers {
                    name
                    id
                    widgetsAggregate {
                        count
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery({
                fetchPolicy: 'no-cache',
                query,
            })
            .valueChanges.pipe(map((results) => (results as ApolloQueryResult<{ manufacturers: Manufacturer[] }>).data.manufacturers));
    }

    public getManufacturer(id: string) {
        const query = gql`
            query Query($where: ManufacturerWhere) {
                manufacturers(where: $where) {
                    name
                    id
                    widgets {
                        id
                        name
                        stockLevel
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery({
                fetchPolicy: 'no-cache',
                query,
                variables: {
                    where: {
                        id,
                    },
                },
            })
            .valueChanges.pipe(map((results) => (results as ApolloQueryResult<{ manufacturers: Manufacturer[] }>).data.manufacturers[0]));
    }

    public addManufacturer(name: string) {
        const mutation = gql`
            mutation AddManufacturer($input: [ManufacturerCreateInput!]!) {
                createManufacturers(input: $input) {
                    manufacturers {
                        id
                        name
                    }
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                input: [{ name }],
            },
        });
    }

    public updateManufacturer(manufacturerId: string, name: string) {
        const mutation = gql`
            mutation UpdateManufacturers($where: ManufacturerWhere, $update: ManufacturerUpdateInput) {
                updateManufacturers(where: $where, update: $update) {
                    manufacturers {
                        name
                        id
                    }
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                where: {
                    id: manufacturerId,
                },
                update: {
                    name: name,
                },
            },
        });
    }

    public deleteManufacturer(manufacturerId: string) {
        const mutation = gql`
            mutation DeleteManufacturer($where: ManufacturerWhere!) {
                deleteManufacturers(where: $where) {
                    nodesDeleted
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                where: {
                    id: manufacturerId,
                },
            },
        });
    }

    public getWidgetTypes() {
        const query = gql`
            query {
                widgetTypes {
                    id
                    name
                    widgetsAggregate {
                        count
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery({
                fetchPolicy: 'no-cache',
                query,
            })
            .valueChanges.pipe(map((results) => (results as ApolloQueryResult<{ widgetTypes: WidgetType[] }>).data.widgetTypes));
    }

    public getWidgetType(id: string) {
        const query = gql`
            query {
                widgetTypes {
                    id
                    name
                    widgets {
                        id
                        name
                        stockLevel
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery({
                fetchPolicy: 'no-cache',
                query,
                variables: {
                    where: {
                        id,
                    },
                },
            })
            .valueChanges.pipe(map((results) => (results as ApolloQueryResult<{ widgetTypes: WidgetType[] }>).data.widgetTypes[0]));
    }

    public addWidgetType(name: string) {
        const mutation = gql`
            mutation AddWidgetType($input: [WidgetTypeCreateInput!]!) {
                createWidgetTypes(input: $input) {
                    widgetTypes {
                        id
                        name
                    }
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                input: [{ name }],
            },
        });
    }

    public updateWidgetType(widgetTypeId: string, name: string) {
        const mutation = gql`
            mutation UpdateWidgetType($where: WidgetTypeWhere!, $update: WidgetTypeUpdateInput!) {
                updateWidgetTypes(where: $where, update: $update) {
                    widgetTypes {
                        id
                        name
                    }
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                where: {
                    id: widgetTypeId,
                },
                update: { name },
            },
        });
    }

    public deleteWidgetType(widgetTypeId: string) {
        const mutation = gql`
            mutation DeleteWidgetType($where: WidgetTypeWhere!) {
                deleteWidgetTypes(where: $where) {
                    nodesDeleted
                }
            }
        `;

        return this.apollo.mutate({
            mutation,
            variables: {
                where: {
                    id: widgetTypeId,
                },
            },
        });
    }
}
