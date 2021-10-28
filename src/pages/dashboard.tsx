import dynamic from 'next/dynamic';
import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

const chartOptions = {
    chart: {
      toolbar: {
          show: false,
      },
      zoom: {
          enabled: false,
      },
      forceColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            '2021-08-20T00:00:00.000Z',
            '2021-08-21T00:00:00.000Z',
            '2021-08-22T00:00:00.000Z',
            '2021-08-23T00:00:00.000Z',
            '2021-08-24T00:00:00.000Z',
            '2021-08-25T00:00:00.000Z',
            '2021-08-26T00:00:00.000Z',
        ],
    },
    fill: {
        opactity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opactityFrom: 0.7,
            opactityTo: 0.3,
        }
    }
};

const chartSeries = [
    { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }
];


export default function Dashboard() {
    return (
        <Flex flexDirection="column" h="100vh" >
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
                <Sidebar />
                
                <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
                    <Box
                        p={["4", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                        h={280}
                    >
                        <Text fontSize="lg" mb="4">
                            Weekly subscribers
                        </Text>

                        <Chart options={chartOptions} series={chartSeries} type="area" height={160} />

                    </Box>

                    <Box
                        p={["4", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                        h={280}
                    >
                        <Text fontSize="lg" mb="4">
                            Opening rate
                        </Text>

                        <Chart options={chartOptions} series={chartSeries} type="area" height={160} />

                    </Box>
                </SimpleGrid>
            </Flex>

        </Flex>
    )
}