import type { TTask } from '~/types/types'

function dayRadarParser(daysData: ({ listTasks: string[]; completedTasks: TTask[] })[]) {
  if (daysData.length === 0)
    return { labels: [], dataset: [] }

  // = { taskName1: [0,100,0], ... , taskNameN: [x,y,z] }
  const rawSumData = daysData.reduce((acc, day) => {
    const completedTaskNames = day.completedTasks.map(task => task.taskContent)

    day.listTasks.forEach((taskName) => {
      if (!acc[taskName])
        acc[taskName] = []

      acc[taskName] = [...acc[taskName], completedTaskNames.includes(taskName) ? 100 : 0]
    })
    return acc
  }, {} as { [key: string]: number[] })

  // = { taskName1: 33, ... , taskNameN: K }
  const treatedSumData = Object.keys(rawSumData).reduce((acc, taskName) => {
    acc[taskName] = Math.round(UTIL.getAverageVal(rawSumData[taskName]))
    return acc
  }, {} as { [key: string]: number })

  return { labels: Object.keys(treatedSumData), dataset: Object.values(treatedSumData) }
}

export { dayRadarParser }
