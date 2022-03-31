

interface Component1 {
    function1(a: number): string    //  tick
    function2(a: string): number
    function3(a: string): string    //  tick
}

interface Component2 {
    function2(a: string): number
    function4(a: string): string
    function5(a: string): string    //  tick
}

class Component1Impl implements Component1 {
    function1(a: number): string {
        return a + ": original function1"
    }

    function2(a: string): number {
        return 1
    }

    function3(a: string): string {
        return "function3: " + a
    }

}

class Component2Impl implements Component2 {
    function2(a: string): number {
        return 2
    }

    function4(a: string): string {
        return "function 4:" + a
    }

    function5(a: string): string {
        return "function 5:" + a
    }

}



interface Integrat {
    function1(a: number): string
    function2(a: string): number
}

interface CompletedHostInterface {
    function1(a: number): string
    function2(a: string): number
    function3(a: string): string
    // function4(a: string): string
}

class IntegrationContainer {

    component1: Component1
    component2: Component2

    constructor(component1: Component1,component2: Component2) {
        this.component1 = component1
        this.component2 = component2
    }

    function1(a: number): string {
        return a + ": function1 from IntegratedSurface"
    }

    function2(a: string): number {
        return 1;
    }

    function5(a: string): string {
        return "function5 from IntegratedSurface"
    }

    otherFunction(a: string, b: string): string {
        return "otherFunction: " + a + "   " + b
    }

    private helperFunction(x: number): number {
        return 10
    }

}

interface IntegratedComponent {
    function1(a: number): string
    function3(a: string): string
    function5(a: string): string
    otherFunction(a: string, b: string): string
}

export *;